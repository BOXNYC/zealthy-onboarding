'use server'

import { defaults, Settings, InputSteps } from "@/settings/config"
import { User, UserData } from "@/types/models"
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcrypt'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
)

export async function getConfig(): Promise<Settings> {
    const resp = await supabase
        .from("configs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();
    if (resp.error || !resp.data) return defaults;
    return resp.data.data;
}

export async function saveConfig(steps: InputSteps): Promise<boolean> {
    const config = await getConfig();
    config.input.steps = steps as InputSteps;
    const resp = await supabase.from("configs").insert([{data: config}]);
    console.log(resp);
    return !resp.error;
}

export async function getUsers(): Promise<User[]> {
    const resp = await supabase.from("users").select("*");
    if (resp.error || !resp.data) return [];
    return resp.data;
}

export async function getUser(id: number): Promise<User | null> {
    const resp = await supabase.from("users").select("*").match({id}).limit(1).single();
    if (resp.error || !resp.data) return null;
    const user = resp.data as User;
    user.password = '<redacted>';
    return user;
}

export async function createUser(email: string, password: string): Promise<number | null> {
    const passwordHash = await hashPassword(password.trim());
    const { data, error } = await supabase.from("users").insert<Partial<User>>([{
        email,
        password: passwordHash
    }]).select();
    if (error || !data) return null;
    return data[0].id;
}

export async function updateUserData(id: number, data: UserData): Promise<boolean> {
    const user: User | null = await getUser(id);
    if (!user) return false;
    if (user.data !== null) data = {...user.data, ...data};
    const resp = await supabase.from("users").update({data}).match({id});
    return !resp.error;
}

async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}
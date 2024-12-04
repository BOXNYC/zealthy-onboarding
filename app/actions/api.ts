'use server'

import { defaults, Settings } from "@/settings/config"

export async function getConfig(): Promise<Settings> {
    return defaults
}
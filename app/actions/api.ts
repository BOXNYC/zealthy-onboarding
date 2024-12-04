'use server'

import { defaults } from "@/settings/config"

export async function getConfig(): Promise<any> {
    return defaults
}
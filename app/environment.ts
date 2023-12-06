export const environmentVariables: EnvironmentVariables = {
    api_url: process.env.NEXT_PUBLIC_API_URL ?? '',
    api_key: process.env.NEXT_PUBLIC_API_KEY ?? '',
}

interface EnvironmentVariables {
    api_url: string,
    api_key: string,
}
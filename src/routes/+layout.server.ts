export async function load({ cookies }) {
    const uniAuth = cookies.get('uni_auth')
    return {isAuthenticated: !!uniAuth}
}

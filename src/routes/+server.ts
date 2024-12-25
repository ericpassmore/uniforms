export async function load({ cookies }) {
    const uniAuth = cookies.get('uni_auth')
    const isAuthenticated =  !!uniAuth;

    return {isAuthenticated: isAuthenticated}
}
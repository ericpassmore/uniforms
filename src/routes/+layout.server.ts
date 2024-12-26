export const load = async ({cookies}) => {
    const uniAuth = cookies.get('uni_auth')
    return {isAuthenticated: !!uniAuth}
}

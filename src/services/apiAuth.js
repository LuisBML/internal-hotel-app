import supabase, { supabaseUrl } from "./supabase";

// from supabase API docs

export async function signup({ fullName, email, password }) {
    const { data, error } = await supabase.auth.signUp({
        email, password,
        options: { data: { fullName, avatar: '' } }
    });

    if (error) throw new Error(error.message);

    // return user data
    return data;
}

export async function login({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) throw new Error(error.message);

    // return user data
    return data;
}

export async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) throw new Error(error.message);

    return true;
}

export async function getCurrentUser() {
    // check for an active session (from the web browser local storage)
    const { data: session } = await supabase.auth.getSession();

    // No current user
    if (!session.session) return null

    // Fetch current user
    const { data, error } = await supabase.auth.getUser();

    if (error) throw new Error(error.message);

    return data?.user;
}

export async function updateCurrentUser({ password, fullName, avatar }) {
    // 1. Update password or fullName
    let updateData;
    if (password) updateData = { password }
    if (fullName) updateData = { data: { fullName } }

    // update current/authenticated user
    const { data, error } = await supabase.auth.updateUser(updateData);

    if (error) throw new Error(error.message);

    if (!avatar) return data;

    // 2. Upload new avatar image to avatars bucket
    const fileName = `avatar-${data.user.id}-${Math.random()}`;
    const { error: storageError } = await supabase
        .storage
        .from('avatars')
        .upload(fileName, avatar);

    if (storageError) throw new Error(storageError.message);

    // 3. Update avatar in the user (set avatar URL)
    const { data: userWithNewAvatar, error: userAvatarError } = await supabase.auth
        .updateUser({ data: { avatar: `${supabaseUrl}/storage/v1/object/public/avatars//${fileName}` } })

    if (userAvatarError) throw new Error(userAvatarError.message);

    return userWithNewAvatar;

}





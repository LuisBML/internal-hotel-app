import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
    const { data, error: errorMsg } = await supabase
        .from('cabins')
        .select('*');

    if (errorMsg) {
        console.error(errorMsg)
        throw new Error('Cabins could not be loaded');
    }

    return data;
}

export async function createEditCabin(myCabin, cabinId) {
    const hasImagePath = myCabin.image?.startsWith?.(supabaseUrl);

    const imageName = `${Math.random()}-${myCabin.image.name}`.replaceAll('/', '');
    const imagePath = hasImagePath ? myCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images//${imageName}`;

    // 1. Create/edit cabin
    let query = supabase.from('cabins')
    // a) Create
    if (!cabinId)
        query = query.insert([{ ...myCabin, image: imagePath }])

    // b) Edit
    if (cabinId)
        query = query
            .update({ ...myCabin, image: imagePath })
            .eq('id', cabinId)

    const { data, error: errorMsg } = await query.select();

    if (errorMsg) {
        console.error(errorMsg)
        throw new Error('Cabin could not be created');
    }

    // 2. Upload image
    if (hasImagePath) {
        return data
    }

    const { error: storageError } = await supabase.storage
        .from('cabin-images')
        .upload(imageName, myCabin.image)

    // 3. Delete cabin if there was an error uploading the image
    if (storageError) {
        await supabase
            .from('cabins')
            .delete()
            .eq('id', data.id)

        console.error(storageError)
        throw new Error('Cabin image could not be uploaded. The cabin was not created');
    }

    return data;
}

export async function deleteCabin(id) {
    const { error: errorMsg } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id)


    if (errorMsg) {
        console.error(errorMsg)
        throw new Error('Cabin could not be deleted');
    }

    return true;
}
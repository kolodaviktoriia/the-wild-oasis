import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins cpuld not be loaded');
  }

  return data;
}
export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );

  const imamgePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  //1. Create cabin
  //https://dwxllzuqsyrlsysbppgl.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imamgePath }]);

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be created');
  }
  //2.Upload image

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  //3. Delete Cabin  if there was an  error uploading
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.log(storageError);
    throw new Error(
      'Cabin could not be uploaded and the cabin was not created'
    );
  }
  return data;
}

export async function deleteCabin(id) {
  const { error, data } = await supabase.from('cabins').delete().eq('id', id);
  console.log(data);
  if (error) {
    console.error(error);
    throw new Error('Cabins could not be deleted');
  }

  return data;
}

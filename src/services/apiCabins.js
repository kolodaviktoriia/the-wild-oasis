import supabase from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins cpuld not be loaded');
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

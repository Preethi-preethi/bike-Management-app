import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lzjzpteniajcivnqeyup.supabase.co';
const supabaseAnonKey = 'sb_publishable_rt1vGiazDk1tgP2i_jcWPQ_FofltjrJ';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkCols() {
  const { data, error } = await supabase.from('service_bookings').select('*').limit(1);
  if (data && data.length > 0) {
    console.log(Object.keys(data[0]));
  } else {
    console.log("No data or error:", error, data);
  }
}

checkCols();

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://lzjzpteniajcivnqeyup.supabase.co';
const supabaseAnonKey = 'sb_publishable_rt1vGiazDk1tgP2i_jcWPQ_FofltjrJ';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  const { data, error } = await supabase.from('service_bookings').select('*').limit(1);

  if (error) {
    console.error('Select Error:', error);
  } else {
    console.log('Columns:', Object.keys(data[0]));
  }
}

run();

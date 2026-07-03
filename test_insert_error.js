const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://lzjzpteniajcivnqeyup.supabase.co';
const supabaseAnonKey = 'sb_publishable_rt1vGiazDk1tgP2i_jcWPQ_FofltjrJ';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  const { data, error } = await supabase.from('service_bookings').insert([{
    customer_name: 'Test',
    preferred_date: '2026-07-02',
    preferred_time: '18:00'
  }]);

  if (error) {
    console.error('Insert Error:', JSON.stringify(error, null, 2));
  } else {
    console.log('Insert Success:', data);
  }
}

run();

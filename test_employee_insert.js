const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

async function test() {
  try {
    const code = fs.readFileSync('./admin-portal/src/lib/supabase.js', 'utf8');
    const urlMatch = code.match(/supabaseUrl\s*=\s*['"]([^'"]+)['"]/);
    const keyMatch = code.match(/supabaseAnonKey\s*=\s*['"]([^'"]+)['"]/);
    
    if (!urlMatch || !keyMatch) {
      console.log('Could not find url or key');
      return;
    }
    const supabase = createClient(urlMatch[1], keyMatch[1]);
    
    // First find a company
    const { data: companyData, error: companyError } = await supabase.from('companies').select('id').limit(1);
    if (companyError || !companyData || companyData.length === 0) {
      console.log('Company fetch error:', companyError);
      return;
    }
    
    const companyId = companyData[0].id;
    console.log('Using company ID:', companyId);

    // Attempt to insert an employee
    const { data, error } = await supabase.from('employees').insert([{
      company_id: companyId,
      name: 'Test Employee',
      phone: '1234567890'
    }]);
    
    if (error) {
      console.log('INSERT ERROR:', JSON.stringify(error, null, 2));
    } else {
      console.log('INSERT SUCCESS');
    }
  } catch (e) {
    console.log('Error:', e.message);
  }
}
test();

import { createClient } from '@libsql/client';

async function testLibSQL() {
  console.log('Testing LibSQL basic functionality...');
  
  const client = createClient({
    url: 'file:./test.db'
  });

  try {
    // Test basic SQL execution
    await client.execute('CREATE TABLE test (id INTEGER PRIMARY KEY, name TEXT)');
    console.log('✅ Table creation successful');

    await client.execute('INSERT INTO test (name) VALUES (?)', ['Hello LibSQL']);
    console.log('✅ Insert successful');

    const result = await client.execute('SELECT * FROM test');
    console.log('✅ Select successful:', result.rows);

    console.log('🎉 LibSQL is working correctly!');
    
  } catch (error) {
    console.error('❌ LibSQL test failed:', error);
  } finally {
    // Clean up
    await client.execute('DROP TABLE IF EXISTS test');
  }
}

testLibSQL();
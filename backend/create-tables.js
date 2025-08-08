const { query, testConnection } = require('./database');
const fs = require('fs');
const path = require('path');

const createTables = async () => {
  try {
    console.log('🚀 Creando tablas de la base de datos Onkos...');
    
    // Verificar conexión
    const connected = await testConnection();
    if (!connected) {
      console.log('❌ No se pudo conectar a la base de datos');
      return;
    }
    
    console.log('✅ Conexión establecida, creando tablas...');
    
    // Leer el archivo SQL
    const sqlFile = path.join(__dirname, 'database_ini.sql');
    const sqlContent = fs.readFileSync(sqlFile, 'utf8');
    
    // Dividir el contenido en comandos individuales y separar CREATE TABLE de CREATE INDEX
    const allCommands = sqlContent
      .split(';')
      .map(cmd => cmd.trim())
      .filter(cmd => cmd.length > 0 && !cmd.startsWith('--'));
    
    // Separar comandos CREATE TABLE de CREATE INDEX
    const createTableCommands = allCommands.filter(cmd => cmd.toUpperCase().startsWith('CREATE TABLE'));
    const createIndexCommands = allCommands.filter(cmd => cmd.toUpperCase().startsWith('CREATE INDEX') || cmd.toUpperCase().startsWith('CREATE UNIQUE INDEX'));
    
    // Ejecutar primero las tablas, luego los índices
    const commands = [...createTableCommands, ...createIndexCommands];
    
    console.log(`📋 Ejecutando ${commands.length} comandos SQL...`);
    
    // Ejecutar cada comando
    for (let i = 0; i < commands.length; i++) {
      const command = commands[i];
      if (command.trim()) {
        try {
          await query(command);
          console.log(`✅ Comando ${i + 1}/${commands.length} ejecutado`);
        } catch (error) {
          // Ignorar errores de "ya existe" para tablas e índices
          if (error.message.includes('already exists') || 
              error.message.includes('duplicate key') ||
              error.message.includes('relation') && error.message.includes('already exists')) {
            console.log(`ℹ️  Comando ${i + 1}/${commands.length} ya existe`);
          } else {
            console.error(`❌ Error en comando ${i + 1}/${commands.length}:`, error.message);
          }
        }
      }
    }
    
    console.log('\n🎉 ¡Tablas creadas exitosamente!');
    
    // Verificar que las tablas se crearon correctamente
    console.log('\n📊 Verificando tablas creadas...');
    const tablesResult = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);
    
    if (tablesResult.rows.length > 0) {
      console.log('✅ Tablas encontradas:');
      tablesResult.rows.forEach(row => {
        console.log(`   • ${row.table_name}`);
      });
    } else {
      console.log('⚠️  No se encontraron tablas');
    }
    
  } catch (error) {
    console.error('❌ Error creando tablas:', error);
  } finally {
    process.exit(0);
  }
};

// Ejecutar si se llama directamente
if (require.main === module) {
  createTables();
}

module.exports = { createTables }; 
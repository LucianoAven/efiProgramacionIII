#!/usr/bin/env node

/**
 * Script para limpiar la base de datos eliminando todos los datos de prueba
 * 
 * Uso: node clearDatabase.js
 */

const { execSync } = require('child_process');

console.log('🗑️  Iniciando limpieza de la base de datos...\n');

async function clearDatabase() {
  try {
    console.log('⚠️  ADVERTENCIA: Esto eliminará TODOS los datos de la base de datos');
    console.log('   Presiona Ctrl+C para cancelar o espera 5 segundos para continuar...\n');
    
    // Esperar 5 segundos antes de continuar
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    console.log('🔄 Eliminando todos los seeders...');
    
    try {
      execSync('npx sequelize-cli db:seed:undo:all', { 
        stdio: 'inherit',
        cwd: __dirname 
      });
      console.log('✅ Base de datos limpiada correctamente\n');
    } catch (error) {
      console.log('⚠️  Error al limpiar o la base de datos ya estaba limpia\n');
    }

    console.log('🎉 ¡Limpieza completada!');
    console.log('💡 Para poblar nuevamente la base de datos ejecuta:');
    console.log('   node runSeeders.js');

  } catch (error) {
    console.error('❌ Error durante la limpieza:', error.message);
    process.exit(1);
  }
}

// Verificar que estamos en el directorio correcto
const currentDir = process.cwd();
if (!currentDir.includes('API-REST-DB')) {
  console.log('⚠️  Ejecuta este script desde el directorio API-REST-DB');
  console.log('   cd API-REST-DB');
  console.log('   node clearDatabase.js');
  process.exit(1);
}

clearDatabase();

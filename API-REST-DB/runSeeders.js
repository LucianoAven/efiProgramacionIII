#!/usr/bin/env node

/**
 * Script para poblar la base de datos con datos de prueba
 * Ejecuta todos los seeders en el orden correcto
 * 
 * Uso: node runSeeders.js
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🌱 Iniciando proceso de seeding de la base de datos...\n');

const seeders = [
  '01-seed-users.js',
  '02-seed-employees.js', 
  '03-seed-schedules.js',
  '04-seed-schedule-requests.js'
];

async function runSeeders() {
  try {
    console.log('📋 Seeders a ejecutar:');
    seeders.forEach((seeder, index) => {
      console.log(`   ${index + 1}. ${seeder}`);
    });
    console.log('');

    for (let i = 0; i < seeders.length; i++) {
      const seeder = seeders[i];
      console.log(`🔄 Ejecutando seeder ${i + 1}/${seeders.length}: ${seeder}`);
      
      try {
        execSync(`npx sequelize-cli db:seed --seed ${seeder}`, { 
          stdio: 'inherit',
          cwd: __dirname 
        });
        console.log(`✅ ${seeder} ejecutado correctamente\n`);
      } catch (error) {
        console.log(`⚠️  ${seeder} ya fue ejecutado o falló\n`);
      }
    }

    console.log('🎉 ¡Proceso de seeding completado!\n');
    console.log('📊 Datos creados:');
    console.log('   👥 10 Usuarios (4 admin, 6 empleados)');
    console.log('   👷 6 Empleados con diferentes posiciones');
    console.log('   📅 10 Horarios distribuidos en diferentes fechas');
    console.log('   📝 6 Solicitudes de horario con diferentes estados');
    console.log('');
    console.log('🔑 Credenciales de acceso:');
    console.log('   📧 Email: cualquier email de los usuarios');
    console.log('   🔒 Contraseña: el nombre que aparece antes del @ en el email');
    console.log('');
    console.log('👨‍💼 Usuarios Admin:');
    console.log('   - pedrose@gmail.com (contraseña: pedrose)');
    console.log('   - maria@gmail.com (contraseña: maria)'); 
    console.log('   - juanos@gmail.com (contraseña: juanos)');
    console.log('   - bonifacio@gmail.com (contraseña: bonifacio)');
    console.log('');
    console.log('👩‍💼 Usuarios Empleado:');
    console.log('   - alejandro@gmail.com (contraseña: alejandro)');
    console.log('   - carolina@gmail.com (contraseña: carolina)');
    console.log('   - fede@gmail.com (contraseña: fede) [inactivo]');
    console.log('   - carla@gmail.com (contraseña: carla)');
    console.log('   - valentina@gmail.com (contraseña: valentina)');
    console.log('   - maldonado@gmail.com (contraseña: maldonado)');

  } catch (error) {
    console.error('❌ Error durante el proceso de seeding:', error.message);
    process.exit(1);
  }
}

// Verificar que estamos en el directorio correcto
const currentDir = process.cwd();
if (!currentDir.includes('API-REST-DB')) {
  console.log('⚠️  Ejecuta este script desde el directorio API-REST-DB');
  console.log('   cd API-REST-DB');
  console.log('   node runSeeders.js');
  process.exit(1);
}

runSeeders();

import { seedData } from './seedHovedlisten';

async function main() {
  try {
    // This is for local development only
    // For actual seeding, use the /seed endpoint in the application
    console.log("💡 For database seeding, visit: http://localhost:5173/seed");
    console.log("🚫 This script is for reference only - use the web endpoint for actual seeding");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

main();
import { adminEmail, adminPassword, salt } from '../config';
import { Admin } from '../models/admin.model';
import bcrypt from 'bcrypt';

export async function SeedAdmin() {
  try {
    // checking if admin exist or not
    const [adminInfo] = await Admin.find();
    if (adminInfo) return;

    // when no admin was found in database create a new admin
    const hashedPassword = await bcrypt.hash(adminPassword, salt);
    await Admin.create({
      email: adminEmail,
      password: hashedPassword,
    });

    console.log('Admin is created');
  } catch (err) {
    console.log(err);
  }
}

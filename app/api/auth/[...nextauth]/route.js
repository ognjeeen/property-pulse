import NextAuth from 'next-auth';
import { authOptions } from '@/utils/authOptions';

//authOptions file is GoogleProvider file
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

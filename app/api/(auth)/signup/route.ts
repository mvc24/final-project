import bcrypt from 'bcrypt';
import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// check every line of code that you write before you move to the next line
// this is incomplete, check the repo

//

const signupSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
});

export async function POST(
  request: NextRequest,
): Promise<NextResponse<NextApiResponse>> {
  const body = await request.json();
  console.log('body: ', body);

  const user = await getUserByUsername(result.data.username);

  const passwordhash = await bcrypt.hash(result.data.password, 12);

  console.log('Result: ', passwordhash, result.data.password);

  const newUser = await createUser(result.data.username, passwordhash);

  if (!newUser)
    return NextResponse.json({
      user: { username: 'hello' },
    });
}

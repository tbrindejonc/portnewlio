export async function POST(request: Request) {
  // read received data
  const body = await request.json();
  // return data to client for testing
  return Response.json({message: 'Category received', data: body});
}

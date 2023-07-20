import { NextApiRequest, NextApiResponse } from 'next';

/* API 예시 */
export default function exampleAPI(req: NextApiRequest, res: NextApiResponse) {
  res.json('example api');
}

// import type { LoaderArgs, MetaFunction } from '@vercel/remix';
// import { json } from '@vercel/remix';
// import { cacheHeader } from 'pretty-cache-header';
// import { Linkbox } from '~/components/Linkbox';
// import { createServerClient } from '~/utils/supabase.server';

// import { useLoaderData } from '@remix-run/react';
// import { formulaSpaceReset, headingText, text } from '~/style/text';

// const TITLE = 'Bookmarks | Brett Smith - Frontend Engineer';

// export const meta: MetaFunction = () => {
//   return {
//     title: TITLE,
//     'og:title': TITLE,
//     'twitter:title': TITLE,
//   };
// };

// export const headers = () => {
//   return {
//     'Cache-Control': cacheHeader({
//       sMaxage: '30days',
//       staleWhileRevalidate: '1day',
//     }),
//   };
// };

// export const loader = async ({ request }: LoaderArgs) => {
//   const response = new Response();
//   const supbase = createServerClient({ request, response });

//   const { data, error } = await supbase
//     .from('Bookmarks')
//     .select('title, url, description')
//     .order('id', { ascending: false });

//   return json({ data, error });
// };

// export default function Bookmarks() {
//   const { data } = useLoaderData<typeof loader>();
//   return (
//     <>
//       <section>
//         <h1
//           className={headingText({
//             className: formulaSpaceReset,
//             level: 'mega',
//           })}
//         >
//           Bookmarks
//         </h1>

//         {/* <ul className="mt-6 md:mt-8-9">
//           {data?.map(({ title, url, description }, index) => (
//             <li
//               key={index}
//               className="[&:not(:first-of-type)]:border-t border-gray"
//             >
//               <Linkbox.Root className="py-3">
//                 <h2 className={headingText({ className: 'mb-0', level: '4' })}>
//                   {url ? (
//                     <Linkbox.Target to={url}>{title}</Linkbox.Target>
//                   ) : (
//                     title
//                   )}
//                 </h2>
//                 <p className={text({ size: '1' })}>{description}</p>
//               </Linkbox.Root>
//             </li>
//           ))}
//         </ul> */}
//       </section>
//     </>
//   );
// }

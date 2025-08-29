export const Footer = () => {
  return (
    <footer className="text-sm md:text-lg row-start-3 flex gap-[24px] flex-wrap items-center justify-center text-zinc-600 p-4">
      © 2025 Nathan Phan. All rights reserved.
    </footer>
  );
};

// const SocialNetwork = () => {
//     return (
//       <div className="relative z-20 mt-4 sm:mt-0">
//         <div className="flex flex-wrap items-center gap-2">
//           {MY_NETWORKS.map((network) => (
//             <a
//               key={network.name}
//               href={network.href}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="border p-2 rounded-xl sm:rounded-2xl hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors duration-300"
//             >
//               <network.icon className="size-5 sm:size-6 md:size-7 lg:size-8" />
//             </a>
//           ))}
//         </div>
//       </div>
//     );
//   };

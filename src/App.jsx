import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";



import Home from "./pages/Home";
import FetchRQ from "./pages/FetchRQ";
import FetchOld from "./pages/FetchOld";
import InfiniteScroll from "./pages/InfiniteScroll"
import FetchIndv from "./components/ui/FetchIndv"
import { MainLayout } from "./components/layout/MainLayout"
import { Toaster } from "react-hot-toast";


// Create a router
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/trad",
        element: <FetchOld />,
      },
      {
        path: "/rq",
        element: <FetchRQ />,
      },
      {
        path: "/rq/:id",
        element: <FetchIndv />,
      },
      {
        path: "/infinite",
        element: <InfiniteScroll />,
      },
    ],
  },
]);

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
      <ReactQueryDevtools initialIsOpen={false} />

      <Toaster
        toastOptions={{
          style: {
            background: '#111', // Matches your card background
            color: '#fff',
            border: '1px solid #1f2937', // border-gray-800
            fontSize: '12px',
            letterSpacing: '0.05em',
            borderRadius: '4px',
            fontFamily: 'monospace',
          },
          success: {
            iconTheme: {
              primary: '#6366f1', // Indigo-500
              secondary: '#111',
            },
          },
        }}

        position="top-center"
      />
    </QueryClientProvider>
  );
};

export default App;
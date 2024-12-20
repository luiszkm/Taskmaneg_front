import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('token')?.value;

  console.log('Token:', currentUser);

  const protectedRoutes = ['/dashboard', '/usertask', '/team'];

  // Verificar se a rota atual é protegida
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // Se o usuário não estiver autenticado e acessar uma rota protegida
  if (!currentUser && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Se o usuário estiver autenticado e tentar acessar a página de login
  if (currentUser && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Permitir que a requisição continue
  return NextResponse.next();
}

// Configuração para aplicar o middleware apenas em rotas específicas
export const config = {
  matcher: ['/dashboard/:path*', '/usertask/:path*', '/usertask', '/team'], // Rotas protegidas
};

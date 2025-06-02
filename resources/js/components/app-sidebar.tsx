import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Folder, Home, MessageCircle,Heart, Store, User } from 'lucide-react';
import AppLogo from './app-logo';
import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types/inertia';

export function AppSidebar() {
    const { props } = usePage<PageProps>();
    const user = props.auth.user;

    const mainNavItems: NavItem[] = [
        {
            title: 'Inicio',
            href: '/dashboard',
            icon: Home,
        },
        {
            title: 'Favoritos',
            href: route('favorites.index'),
            icon: Heart,
        },
        {
            title: 'Mensajes',
            href: route('conversations.index'),
            icon: MessageCircle,
        },
        {
            title: 'Mis Ventas',
            href: route('misProductos.index'),
            icon: Store,
        },
        // Mostrar solo si el usuario es admin
        ...(user?.role === 'admin'
            ? [{
                  title: 'Administración',
                  href: route('admin.products.index'),
                  icon: User,
              }]
            : [])
    ];

    const footerNavItems: NavItem[] = [
        {
            title: 'Campus Virtual',
            href: 'https://campusvirtual.univalle.edu.co/moodle/login/index.php',
            icon: Folder,
        }
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
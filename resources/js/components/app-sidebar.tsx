import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { ShoppingCart,Folder, Home, MessageCircle, ShoppingBag, Heart, Store } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Inicio',
        href: '/dashboard',
        icon: Home,
    },

    {
        title: 'Mis compras',
        href: '/dashboard',
        icon: ShoppingBag,
    },
    {
        title: 'Favoritos',
        href: '/dashboard',
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
    {
        title: 'Carrito',
        href: '/dashboard',
        icon: ShoppingCart,
    },


];

const footerNavItems: NavItem[] = [
    {
        title: 'Campus Virtual',
        href: 'https://campusvirtual.univalle.edu.co/moodle/login/index.php',
        icon: Folder,
    }
];

export function AppSidebar() {
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

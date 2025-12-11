import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';

interface BreadcrumbLayoutProps {
  items: { label: string; href?: string }[];
}

export default function BreadcrumbLayout({
  items,
}: Readonly<BreadcrumbLayoutProps>) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <BreadcrumbItem
            key={index}
            className={index === items.length - 1 ? '' : 'hidden md:block'}
          >
            {item.href ? (
              <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
            ) : (
              <BreadcrumbPage>{item.label}</BreadcrumbPage>
            )}
            {index !== items.length - 1 && (
              <BreadcrumbSeparator className='hidden md:block' />
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

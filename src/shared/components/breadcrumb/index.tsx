import { BreadcrumbType } from '@shared/types/breadcrumbType';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';
import React from 'react';

interface BreadcrumbLayoutProps {
  items: BreadcrumbType[];
}

export default function BreadcrumbLayout({
  items,
}: Readonly<BreadcrumbLayoutProps>) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <React.Fragment key={item.label}>
            <BreadcrumbItem>
              {item.path ? (
                <BreadcrumbLink href={item.path}>
                  {item.label}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>

            {index < items.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

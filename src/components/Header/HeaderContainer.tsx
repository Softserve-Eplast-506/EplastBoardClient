import React from 'react'
import ReactDOM from 'react-dom'
import Breadcrumbs, { BreadcrumbsItem } from '@atlaskit/breadcrumbs';

import PageHeader from '@atlaskit/page-header';

const breadcrumbs = (
  <Breadcrumbs onExpand={() => {}}>
    <BreadcrumbsItem text="Some project" key="Some project" />
    <BreadcrumbsItem text="Parent page" key="Parent page" />
  </Breadcrumbs>
);

const Header = () => {
  return (
    <PageHeader breadcrumbs={breadcrumbs}>
      Title describing what content to expect on the page
    </PageHeader>
  );
};

export default Header;
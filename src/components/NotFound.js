import React from "react";
import { Link } from "react-router-dom";
import Page from "./Page";
function NotFound() {
  return (
    <Page title='Not Found'>
      <div className='text-center'>
        <h2>404!Page not Found</h2>
        <p className='lead text-muted'>
          Go to the <Link to='/'>Homepage</Link>
        </p>
      </div>
    </Page>
  );
}

export default NotFound;

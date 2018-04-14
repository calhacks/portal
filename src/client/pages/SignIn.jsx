import React from 'react';

export default () =>
<form id="signin" name="signin" method="post" action="signin">
  <label htmlFor="email">Email Address</label>
  <input className="text" name="email" type="text" />
  <label htmlFor="password">Password</label>
  <input name="password" type="password" />
  <input className="btn" type="submit" value="Sign In" />
</form>;


import React from 'react';

export default ({ body, title }) => `
	<html>
		<head>
			<title>${title}</title>
		</head>
		<body style='margin:0;'>
			<div id='app'>${body}</div>
		</body>
	</html>
`;
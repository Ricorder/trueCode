'use client';

import React from 'react';

const DeleteIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-label="Удалить"
			className={className}
			role="img"
			focusable="false"
		>
			<title>Удалить</title>
			<circle cx="12" cy="12" r="10" />
			<line x1="15" y1="9" x2="9" y2="15" />
			<line x1="9" y1="9" x2="15" y2="15" />
		</svg>
	);
};

export default DeleteIcon;

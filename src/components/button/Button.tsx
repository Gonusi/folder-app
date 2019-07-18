import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

export enum ButtonStyle {
	primary,
	secondary,
	dangerous
}

interface Props {
	buttonStyle?: ButtonStyle;
	children: React.ReactNode;
	className?: string;
	disabled?: boolean;
	onClick?: (event: React.MouseEvent) => void;
	title?: string;
}

const Button = ({ buttonStyle = ButtonStyle.primary, children, className, ...props }: Props) => {
	return (
		<button
			{...props}
			type="button"
			className={classNames(
				styles.button,
				{
					[styles.primary]: buttonStyle === ButtonStyle.primary,
					[styles.secondary]: buttonStyle === ButtonStyle.secondary,
					[styles.dangerous]: buttonStyle === ButtonStyle.dangerous
				},
				className
			)}
		>
			{children}
		</button>
	);
};

export default Button;

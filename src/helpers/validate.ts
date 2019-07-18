export const required = (value: string | number, invalidMessage = 'This field is required') => {
	return value || value === 0 ? undefined : invalidMessage;
};
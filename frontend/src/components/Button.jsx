import { Button } from 'flowbite-react';

export const FBButton = ({ color, children }) => {
    return <Button color={color || 'blue'}>{children || ''}</Button>
}
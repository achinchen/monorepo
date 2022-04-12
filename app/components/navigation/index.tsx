import Logo from '~/components/Logo';
import NavigationAction from './links';

export function NavigationDesktop() {
  return (
    <nav
      display="none lg:block"
      h="20"
      px="4"
      py="3"
      bg="white"
      shadow="header"
    >
      <div flex="~" max-w="lg:262" m="auto">
        <Logo type="horizontal" w="29.5" />
        <NavigationAction withLabel />
      </div>
    </nav>
  );
}

export function NavigationBottom() {
  return (
    <NavigationAction
      position="fixed"
      bottom="0"
      display="flex lg:none"
      h="14"
      w="100%"
      shadow="tabs"
    />
  );
}

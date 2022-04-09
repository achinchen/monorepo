import type { IconType } from '~/components/icon';
import { Gender, Family } from '~/constants';

export const getIconByFamily = (family: Family): IconType => {
  return family === Family.Dog ? 'Bone' : 'Fish';
};

export const getIconByGenderAndFamily = ({
  gender,
  family
}: {
  gender: Gender;
  family: Family;
}): IconType => {
  if (!gender) return getIconByFamily(family);
  return gender === Gender.Female ? 'Female' : 'Male';
};

export const Places = ({ data }: PlacesProps) => {
  return <></>;
};

export type PlacesProps = {
  data: PlaceProps[];
};
export type PlaceProps = {
  _id: string;
  name: string;
  description: string;
  cover: string;
  address: string;
  profilephoto: string;
};

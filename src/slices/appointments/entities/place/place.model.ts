export type PlaceProps = {
  _id: string;
  name: string;
  createdById: string;
  categoryPlaceId: string;
  createdAt?: string;
  value?: boolean;
  active?: boolean;
  description: string;
  cover: number;
  latitude: number;
  longitude: number;
  address: string;
  coupons: string;
};

class Place {
  protected props: PlaceProps;
  constructor(props: PlaceProps) {
    this.props = props;
  }
  public static build(props: PlaceProps) {
    return new Place(props);
  }
  get _id(): string {
    return this.props._id;
  }
  get name(): string {
    return this.props.name;
  }
  get description(): string {
    return this.props.description;
  }
  get createdAt(): string | undefined {
    return this.props.createdAt;
  }
  get active(): boolean | undefined {
    return this.props.active;
  }
  get categoryPlaceId(): string {
    return this.props.categoryPlaceId;
  }
  get createdById(): string {
    return this.props.createdById;
  }
  get cover(): number {
    return this.props.cover;
  }
  get latitude(): number {
    return this.props.latitude;
  }
  get longitude(): number {
    return this.props.longitude;
  }
  get address(): string {
    return this.props.address;
  }
  get coupons(): string {
    return this.props.coupons;
  }

  format(): PlaceProps {
    return {
      ...this.props,
      _id: this.props._id,
      name: this.props.name,
      active: this.props.active,
      value: false,
      description: this.props.description,
      createdAt: new Date(this.props.createdAt ?? "").toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    };
  }
}
export const placeModel = (props: PlaceProps) => Place.build(props);

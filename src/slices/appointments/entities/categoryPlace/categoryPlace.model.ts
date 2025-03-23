export type CategoryPlaceProps = {
  _id: string;
  name: string;
  createdById: string;
  createdAt?: string;
  value?: boolean;
  active?: boolean;
};

class CategoryPlace {
  protected props: CategoryPlaceProps;
  constructor(props: CategoryPlaceProps) {
    this.props = props;
  }
  public static build(props: CategoryPlaceProps) {
    return new CategoryPlace(props);
  }
  get _id(): string {
    return this.props._id;
  }
  get name(): string {
    return this.props.name;
  }
  get createdAt(): string | undefined {
    return this.props.createdAt;
  }
  get active(): boolean | undefined {
    return this.props.active;
  }
  get createdById(): string {
    return this.props.createdById;
  }
  format(): CategoryPlaceProps {
    return {
      ...this.props,
      _id: this.props._id,
      name: this.props.name,
      active: this.props.active,
      value: false,
      createdAt: new Date(this.props.createdAt ?? "").toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    };
  }
}
export const categoryplaceModel = (props: CategoryPlaceProps) =>
  CategoryPlace.build(props);

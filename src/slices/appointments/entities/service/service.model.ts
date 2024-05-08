export type ServiceProps = {
  _id: string;
  name: string;
  createdAt: string;
  value?: boolean;
  active?: boolean;
};

class Service {
  protected props: ServiceProps;
  constructor(props: ServiceProps) {
    this.props = props;
  }
  public static build(props: ServiceProps) {
    return new Service(props);
  }
  get _id(): string {
    return this.props._id;
  }
  get name(): string {
    return this.props.name;
  }
  get createdAt(): string {
    return this.props.createdAt;
  }
  get active(): boolean | undefined {
    return this.props.active;
  }
  format(): ServiceProps {
    return {
      ...this.props,
      _id: this.props._id,
      name: this.props.name,
      active: this.props.active,
      value: false,
      createdAt: new Date(this.props.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    };
  }
}
export const serviceModel = (props: ServiceProps) => Service.build(props);

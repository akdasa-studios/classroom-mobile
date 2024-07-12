export abstract class Aggregate<TIdentity, TProps> {
  private readonly _id: TIdentity
  protected readonly _props: TProps

  constructor(id: TIdentity, props: TProps) {
    this._id = id
    this._props = props
  }

  get id(): TIdentity { return this._id }
}
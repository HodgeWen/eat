import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional
} from '@sequelize/core'
import {
  Attribute,
  PrimaryKey,
  AutoIncrement,
  NotNull
} from '@sequelize/core/decorators-legacy'

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>

  /** 第一个名称 */
  @Attribute(DataTypes.STRING)
  @NotNull
  declare firstName: string

  @Attribute(DataTypes.STRING)
  declare lastName: string | null
}
"""empty message

Revision ID: a0adaacca6f8
Revises: 
Create Date: 2024-04-24 21:26:05.383715

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'a0adaacca6f8'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('bid_item')
    op.drop_table('bids')
    with op.batch_alter_table('listing', schema=None) as batch_op:
        batch_op.add_column(sa.Column('is_service', sa.Boolean(), nullable=False))
        batch_op.add_column(sa.Column('is_auction', sa.Boolean(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('listing', schema=None) as batch_op:
        batch_op.drop_column('is_auction')
        batch_op.drop_column('is_service')

    op.create_table('bids',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('amount', sa.DOUBLE_PRECISION(precision=53), autoincrement=False, nullable=False),
    sa.Column('bid_time', postgresql.TIMESTAMP(), autoincrement=False, nullable=True),
    sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('biditem_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['biditem_id'], ['bid_item.id'], name='bids_biditem_id_fkey'),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], name='bids_user_id_fkey'),
    sa.PrimaryKeyConstraint('id', name='bids_pkey')
    )
    op.create_table('bid_item',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('title', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('description', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('start_time', postgresql.TIMESTAMP(), autoincrement=False, nullable=True),
    sa.Column('end_time', postgresql.TIMESTAMP(), autoincrement=False, nullable=False),
    sa.PrimaryKeyConstraint('id', name='bid_item_pkey')
    )
    # ### end Alembic commands ###
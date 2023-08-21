import { PrismaService } from "src/prisma/prisma.service";

export const findById = (id: string) => ({
    where: {
      id
    }
  })

export const findAllFromArray = (ids: string[]) => ({
  where: {
    id: {
      in: ids
    }
  }
})

export class updateClass
{
  static readonly PRODUCT= 'product';
  static readonly CATEGORY= 'category';
  static readonly GALLERY= 'gallery';
  static readonly GALLERY_CATEGORY= 'galleryCategory';
  static readonly DIMENSION= 'dimension';

  static readonly PRODUCT_IDS= 'productIds';
  static readonly CATEGORY_IDS= 'categoryIds';
  static readonly GALLERY_IDS= 'galleryIds';
  static readonly GALLERY_CATEGORY_IDS= 'galleryCategoryIds';
  static readonly DIMENSION_IDS= 'dimensionIds';
};

export const addRelationIdsQuery = (id: string, addId: string) => ({
  ...findById(id),
  data: {
    [updateClass.PRODUCT_IDS]: {
      push: addId
    }
  }
})

export const deleteRelationIdsQuery = (id: string, ids: string[], deleteId: string) => ({
  ...findById(id),
  data: {
    [updateClass.PRODUCT_IDS]: {
      set: ids.filter((Ids) => Ids !== deleteId)
    }
  }
})

export const updateRelationIds = async (prismaService: PrismaService, id: string, ids: string[], collection: string, relation: string) => {


  const current = await prismaService[updateClass[collection]].findUnique(findById(id))[updateClass[relation + '_IDS']];
  console.log(current);
}

// const addRelationIdsQuery = (id: string, prodId) => ({
//   ...findById(id),
//   data: {
//     productIds: {
//       push: prodId
//     }
//   }
// })

// const deleteRelationIdsQuery = (id: string, ids: string[], prodId: string) => ({
//   ...findById(id),
//   data: {
//     productIds: {
//       set: ids.filter((prodIds) => prodIds !== prodId)
//     }
//   }
// })

// if(data.categoryIds) {
//   const currentCategoryIds = (await this.prismaService.product.findUnique(findById(id))).categoryIds;
//   const toAdd = data.categoryIds.filter((cat) => !currentCategoryIds.includes(cat));
//   const toRemove = currentCategoryIds.filter((cat) => !data.categoryIds.includes(cat));
//   const categories = await this.prismaService.category.findMany(findAllFromArray(toRemove));
  
//   await this.prismaService.$transaction([
//     ...toAdd.map((cat) => this.prismaService.category.update(addRelationIdsQuery(cat, id))),
//     ...categories.map((cat) => this.prismaService.category.update(deleteRelationIdsQuery(cat.id, cat.productIds, id)))
//   ])
// }
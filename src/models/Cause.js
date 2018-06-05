import { Record, List, fromJS } from 'immutable';

const shape = {
  id: null,
  ownerId: null,
  adminIds: List(),
  name: null,
  primaryVideoLink: null,
  primaryPhotoLink: null,
  webLink: null,
  tags: List(),
  description: null,
  summary: null,
  donationIds: List()
};

class Cause extends Record(shape) {
  static fromJS(pojo) {
    return new Cause({
      id: pojo.id || null,
      ownerId: pojo.ownerId || null,
      name: pojo.name || null,
      primaryVideoLink: pojo.primaryVideoLink || null,
      primaryPhotoLink: pojo.primaryPhotoLink || null,
      webLink: pojo.webLink || null,
      description: pojo.description || null,
      summary: pojo.summary || null,
      adminIds: pojo.adminIds ? fromJS(pojo.adminIds) : List(),
      tags: pojo.tags ? fromJS(pojo.tags) : List(),
      donationIds: pojo.donationIds ? fromJS(pojo.donationIds) : List()
    });
  }
}

export default Cause;
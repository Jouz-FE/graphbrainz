import { GraphQLObjectType, GraphQLString } from 'graphql/type'
import Node from './node'
import Entity from './entity'
import Area from './area'
import {
  getFallback,
  fieldWithID,
  id,
  mbid,
  name,
  sortName,
  disambiguation,
  aliases,
  lifeSpan,
  recordings,
  releases,
  releaseGroups,
  works,
  relationships,
  tags,
  connectionWithExtras
} from './helpers'

const Artist = new GraphQLObjectType({
  name: 'Artist',
  description: `An [artist](https://musicbrainz.org/doc/Artist) is generally a
musician, group of musicians, or other music professional (like a producer or
engineer). Occasionally, it can also be a non-musical person (like a
photographer, an illustrator, or a poet whose writings are set to music), or
even a fictional character.`,
  interfaces: () => [Node, Entity],
  fields: () => ({
    id,
    mbid,
    name,
    sortName,
    disambiguation,
    aliases,
    country: {
      type: GraphQLString,
      description: `The country with which an artist is primarily identified. It
is often, but not always, its birth/formation country.`
    },
    area: {
      type: Area,
      description: `The area with which an artist is primarily identified. It
is often, but not always, its birth/formation country.`
    },
    beginArea: {
      type: Area,
      description: `The area in which an artist began their career (or where
were born, if the artist is a person).`,
      resolve: getFallback(['begin-area', 'begin_area'])
    },
    endArea: {
      type: Area,
      description: `The area in which an artist ended their career (or where
they died, if the artist is a person).`,
      resolve: getFallback(['end-area', 'end_area'])
    },
    lifeSpan,
    ...fieldWithID('gender', {
      description: `Whether a person or character identifies as male, female, or
neither. Groups do not have genders.`
    }),
    ...fieldWithID('type', {
      description: 'Whether an artist is a person, a group, or something else.'
    }),
    recordings,
    releases,
    releaseGroups,
    works,
    relationships,
    tags
  })
})

export const ArtistConnection = connectionWithExtras(Artist)
export default Artist

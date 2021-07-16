import React from "react";
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";

function ProfileSidebar(properties) {
  return (
    <Box as="aside">
      <img
        src={`https://github.com/${properties.githubUser}.png`}
        style={{ borderRadius: "8px" }}
      />
      <hr />

      <p>
        <a
          className="boxLink"
          href={`https://github.com/${properties.githubUser}`}
        >
          @{properties.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

function ProfileRelationsBox(properties) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {properties.title} ({properties.items.length})
      </h2>

      <ul>
        {/*followers.map((item) => {
          return(
            <li key={item}>
              <a href={`https://github.com/${item}.png`}>
                <img src={item.image} />
                <span>{item.title}</span>
              </a>
            </li>
          )
        })*/}
      </ul>
    </ProfileRelationsBoxWrapper>
  );
}

export default function Home() {
  const user = "LarisseLima";
  const [communities, setcommunities] = React.useState([]);

  const friends = [
    "matheusnascgomes",
    "LarisseLima",
    "anamlcl",
    "lohanyformiga",
    "marianaseidel",
    "juunegreiros",
  ];

  const [followers, setfollowers] = React.useState([]);

  React.useEffect(() => {
    fetch(`https://api.github.com/users/LarisseLima/followers`)
      .then((serverResponse) => serverResponse.json())
      .then((finalResponse) => setfollowers(finalResponse));
    fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        Authorization: "9444ac3475cdcb99742e71445903ce",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query {
          allCommunities {
            id
            title
            imageUrl
            creatorSlug
          }
        }`,
      }),
    })
      .then((resp) => resp.json())
      .then((finalResponse) => {
        const datoCommunities = finalResponse.data.allCommunities;
        setComunidades(datoCommunities);
      });
  }, []);

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSidebar githubUser={user} />
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form
              onSubmit={function handleNewcommunities(e) {
                e.preventDefault();
                const dataForm = new FormData(e.target);
                console.log("Campo: ", dataForm.get("title"));
                console.log("Campo: ", dataForm.get("image"));

                const communities = {
                  title: dataForm.get("title"),
                  imageUrl: dataForm.get("image"),
                  creatorSlug: githubUser,
                };

                fetch("/api/communities", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(communities),
                }).then(async (res) => {
                  const dados = await res.json();
                  console.log(data.recordCreated);
                  const communities = data.recordCreated;
                  const communitiesUpdate = [...communities, communities];
                  setcommunities(communitiesUpdate);
                });
              }}
            >
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>
              <button>Criar comunidades</button>
            </form>
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({communities.length})</h2>
            <ul>
              {communities.map((item) => {
                return (
                  <li key={item.id}>
                    <a href={`/users/${item.title}`}>
                      <img src={item.image} />
                      <span>{item.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({friends.length})
            </h2>

            <ul>
              {friends.map((item) => {
                return (
                  <li key={item}>
                    <a href={`/users/${item}`}>
                      <img src={`https://github.com/${item}.png`} />
                      <span>{item}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}

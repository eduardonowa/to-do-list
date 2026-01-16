# Feedback do Desenvolvimento

## Memórias e Inspiração

Esse projeto me trouxe boas lembranças, porque quando comecei a estudar programação, o primeiro projeto em Vue que fiz foi uma ToDo List, então foi bacana resgatar essa memória.

## Abordagem de Design e Desenvolvimento

Sobre o desenvolvimento, tentei manter tudo bem simples, mas baseado em um Design, utilizei os tokens que são usados em https://bext.vc/ para ter uma paleta de cores e um design pattern para ser seguido.

## Funcionalidades Implementadas

Adicionei uma validação simples de token de autenticação apenas pra de fato simular essa proteção da rota, fiz testes unitários simples, apenas para o código ter uma estrutura mais parecida com uma aplicação real.

Também busquei implementar o projeto adicionando algumas features que eu já vi em outros lugares e achei bacana, mas não tive a oportunidade, por exemplo o Multi-Select, juntamente com a lista de filtros ativos, acredito que tentei deixar a aplicação o mais User Friendly possível e também dar os feedbacks necessários, tanto de api quanto de ações.

## Evolução e Aprendizados

No geral foi muito divertido inclusive pessoalmente em ver minha evolução, quando fiz lá em 2022 esse mesmo projeto, tendo dificuldades em criar funcionalidades simples e agora mesmo quando estou aplicando uma funcionalidade simples eu já penso em alguma forma de incrementar ele pra dar mais poder e conforto pro usuário.

## Desafios e Soluções

Durante o desenvolvimento, enfrentei alguns desafios interessantes, como a implementação do sistema de filtros multi-select e a criação de uma interface que fosse intuitiva mesmo com múltiplas opções de filtragem. A solução foi criar um componente dropdown compacto que mostra o número de seleções e permite uma visualização clara dos filtros ativos.

A integração com o JSON Server também foi um ponto de aprendizado (nunca havia usado essa lib antes), especialmente na parte de autenticação com JWT e na estruturação das rotas para simular um backend real. Mesmo sendo um mock, tentei seguir boas práticas de API REST.

## Organização do Código

Tentei manter uma estrutura de pastas organizada, separando componentes comuns, stores do Pinia, serviços de API e tipos TypeScript. Isso facilitou muito a manutenção e a adição de novas funcionalidades ao longo do desenvolvimento.

A implementação de testes unitários, mesmo que simples, ajudou a garantir que a estrutura do código estava correta e que os componentes principais estavam funcionando como esperado.

## Considerações Finais

Foi uma experiência muito enriquecedora poder trabalhar nesse projeto, aplicando conhecimentos que adquiri ao longo dos anos e também experimentando com novas abordagens.
